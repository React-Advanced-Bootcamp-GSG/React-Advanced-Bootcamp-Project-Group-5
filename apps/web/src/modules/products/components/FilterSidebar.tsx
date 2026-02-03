import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Grid,
  Group,
  Paper,
  RangeSlider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useMemo, useState } from "react";
import { MdClose, MdExpandMore, MdFilterList } from "react-icons/md";
import type { Product } from "../types/entities";
import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  products: Product[];
  selectedCategories: string[];
  priceRange: [number, number];
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  products,
  selectedCategories,
  priceRange,
  onCategoryChange,
  onPriceChange,
  onReset,
}: FilterSidebarProps) {
  const [displayedCategories, setDisplayedCategories] =
    useState(selectedCategories);
  const [showMore, setShowMore] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, [products]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 1000);
  }, [products]);

  const availableCount = useMemo(() => {
    return products.filter((p) => p.isAvailable).length;
  }, [products]);

  const discountCount = useMemo(() => {
    return products.filter((p) => p.hasDiscounts).length;
  }, [products]);

  React.useEffect(() => {
    setDisplayedCategories(selectedCategories);
  }, [selectedCategories]);

  const handleApply = () => {
    onCategoryChange(displayedCategories);
  };

  const handleCategoryToggle = (category: string) => {
    setDisplayedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleReset = () => {
    setDisplayedCategories([]);
    onReset();
  };

  const visibleCategories = showMore ? categories : categories.slice(0, 4);

  return (
    <Paper className={styles.sidebar} p="md" radius="md">
      <Stack gap="lg">
        {/* Header */}
        <div className={styles.header}>
          <Group gap="xs">
            <MdFilterList size={24} className={styles.headerIcon} />
            <Title order={2} size="h3" style={{ margin: 0 }}>
              Filters
            </Title>
          </Group>
          {selectedCategories.length > 0 && (
            <Badge size="lg" variant="light" color="blue">
              {selectedCategories.length} active
            </Badge>
          )}
        </div>

        {/* Quick Stats */}
        <Grid
          className={styles.statsContainer}
          gutter={"sm"}
          justify="space-between"
          display={"flex"}
        >
          <Grid.Col className={styles.stat} span={{ base: 6 }}>
            <Text size="xs" fw={500} c="dimmed">
              Available
            </Text>
            <Text size="lg" fw={700} c="var(--primary-color)">
              {availableCount}
            </Text>
          </Grid.Col>
          <Grid.Col className={styles.stat} span={{ base: 6 }}>
            <Text size="xs" fw={500} c="dimmed">
              Discounts
            </Text>
            <Text size="lg" fw={700} c="var(--accent-color)">
              {discountCount}
            </Text>
          </Grid.Col>
        </Grid>

        <Divider />

        {/* Categories Filter */}
        <div className={styles.filterSection}>
          <Group justify="space-between" mb="sm">
            <Text fw={600} size="sm">
              Categories
            </Text>
            <Badge size="sm" variant="light">
              {displayedCategories.length}
            </Badge>
          </Group>
          <Stack gap="xs" className={styles.checkboxStack}>
            {visibleCategories.map((category) => (
              <div key={category} className={styles.checkboxWrapper}>
                <Checkbox
                  label={category}
                  checked={displayedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  classNames={{
                    label: styles.checkboxLabel,
                    input: styles.checkboxInput,
                  }}
                />
                <Text size="xs" c="dimmed">
                  {products.filter((p) => p.category === category).length}
                </Text>
              </div>
            ))}
          </Stack>
          {categories.length > 4 && (
            <Button
              variant="subtle"
              size="xs"
              fullWidth
              rightSection={<MdExpandMore size={14} />}
              onClick={() => setShowMore(!showMore)}
              mt="sm"
            >
              {showMore ? "Show Less" : `Show More (${categories.length - 4})`}
            </Button>
          )}
        </div>

        <Divider />

        {/* Price Range Filter */}
        <div className={styles.filterSection}>
          <Text fw={600} size="sm" mb="sm">
            Price Range
          </Text>
          <RangeSlider
            value={priceRange}
            onChange={onPriceChange}
            min={0}
            max={maxPrice}
            step={10}
            marks={[
              { value: 0, label: "$0" },
              { value: maxPrice, label: `$${Math.round(maxPrice)}` },
            ]}
            classNames={{
              track: styles.sliderTrack,
              thumb: styles.sliderThumb,
            }}
          />
          <div className={styles.priceDisplay}>
            <Text size="sm" fw={600}>
              ${priceRange[0]} - ${priceRange[1]}
            </Text>
          </div>
        </div>

        <Divider />

        {/* Action Buttons */}
        <Group grow gap="xs">
          <Button onClick={handleApply} fullWidth className={styles.applyBtn}>
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            variant="light"
            fullWidth
            leftSection={<MdClose size={16} />}
            className={styles.resetBtn}
          >
            Reset
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}

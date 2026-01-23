import { Button, Grid, Text } from '@mantine/core';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationControlsProps) => {
  return (
    <Grid.Col span={12} style={{ textAlign: 'center' }}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentPage === 1}
        style={{ marginRight: 8 }}
      >
        Previous
      </Button>
      <Text component="span" fw={500}>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={currentPage === totalPages}
        style={{ marginLeft: 8 }}
      >
        Next
      </Button>
    </Grid.Col>
  );
};

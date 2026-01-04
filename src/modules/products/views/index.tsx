import { useProducts } from ".."

export default  function Products() {
    const value = useProducts();
  return (
    <h1> {value} </h1>
  )
}
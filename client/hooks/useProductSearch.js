import { useEffect, useState } from 'react'
import { getAllProducts } from '../services/product'
import _ from 'lodash'

const useProductSearch = (query, pageNumber, limit) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [hasMore, setHasMore] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                //getAllProducts(Page | limit | sort | searchQuery | category | give all | price | discount | brand)
                const { data: allProducts } = await getAllProducts(pageNumber || 1, limit, query.sort || '' , query.search || "", query.categories || "", false, query.price || "", query.discount || "", query.brand || "")
                setProducts((prevProducts) => {
                    return _.union([...prevProducts, ...allProducts.products])
                })
                setHasMore(( pageNumber * limit) < allProducts.numberOfItems)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                setError(err)
            }
        }
        if(hasMore) {
            fetchData()
        }else {
            setLoading(false)
        }
    }, [query, pageNumber])

    return { loading, error, products, hasMore }
}

export default useProductSearch
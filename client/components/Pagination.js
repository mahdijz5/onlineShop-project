import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { getAllCategories } from '../services/adminDashboard'
import styles from '../styles/Pagination.module.css'

const Pagination = ({ currentPage, numberOfItems, itemPerPage }) => {
    const router = useRouter()
    const preventStrictMode = useRef(false)

    const [page, setCurrentPage] = useState()
    const [hasNextPage, setHasNextPage] = useState()
    const [hasPerviousPage, setHasPerviousPage] = useState()
    const [lastPage, setLastPage] = useState()
    const [path, setPath] = useState(router.pathname+"?")
    const [nextPage, setNextPage] = useState()
    const [perviousPage, setPerviousPage] = useState()


    useEffect(() => {
        setCurrentPage(currentPage)
        setHasNextPage(currentPage * itemPerPage < numberOfItems)
        setHasPerviousPage(currentPage > 1)
        setLastPage(Math.ceil(numberOfItems / itemPerPage))
        setNextPage(currentPage + 1)
        setPerviousPage(currentPage - 1)

        // I need to prevent restrict mode
        if(preventStrictMode.current == false){
            setPath((path) => {
                for(const q in router.query) { 
                    if(q != "page"){
                        path += `${q}=${router.query[q]}&`
                    }
                }
                return path;
            })
            return () => {
                preventStrictMode.current = true
            }
        }
        
    }, [])

    
    return (
        <div className='w-100 text-center'>
            <nav aria-label="..." dir='ltr' className={`${styles.paginatoin} d-inline-block`}>
                <ul className={`pagination`}>
                    <li className={`page-item ${hasPerviousPage ? null : "disabled"}`} onClick={() => {
                        hasPerviousPage ? router.push(`${path}page=${perviousPage}`) : null
                    }}>
                        <span className="page-link">قبلی</span>
                    </li>


                    {hasPerviousPage ? (
                        <li className="page-item" onClick={() => {
                            router.push(`${path}page=${perviousPage}`)
                        }}>
                            <a className="page-link" >{perviousPage}</a>
                        </li>
                    ) : null}

                    <li className="page-item active" aria-current="page">
                        <span className="page-link">{page}</span>
                    </li>

                    {hasNextPage ? (
                        <li className="page-item" onClick={() => {
                            router.push(`${path}page=${nextPage}`)
                        }}>
                            <a className="page-link">{nextPage}</a>
                        </li>
                    ) : null}

                    {currentPage !== lastPage && nextPage !== lastPage && lastPage !== 0 ? (
                        <li className="page-item" onClick={() => {
                            router.push(`${path}page=${lastPage}`)
                        }}>
                            <a className="page-link">...{lastPage}</a>
                        </li>
                    ) : null}
                    <li className={`page-item ${hasNextPage ? null : "disabled"} `} onClick={() => {
                        hasNextPage ? router.push(`${path}page=${nextPage}`) : null
                    }}>
                        
                        <a className="page-link">بعدی</a>
                    </li>

                </ul>
            </nav>
        </div>
    )
}


export default Pagination

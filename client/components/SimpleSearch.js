import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { getAllCategories } from '../services/adminDashboard';
import { Secondary } from '../helpers/color';
import  styles  from '../styles/SimpleSearch.module.css';
import {FiX} from "react-icons/fi"
import _ from "lodash"
import Button  from "./ui/Button"

function SimpleSearch({address}) {
    const router =useRouter()
    const [getSelectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchText,setSearchText] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await getAllCategories()
            setCategories(data.categories)
        }
        fetchData()
        if (router.query != {} && router.query.category != undefined && router.query.category != '') {
            setSelectedCategories(router.query.category.split(','))
        }
    },[])

    const addCategory = (e) => {
        setSelectedCategories((prev) => {
            return [...prev, e.target.value];
        });
    };

    const removeCategory = (cate) => {
        setSelectedCategories((prev) => {
            const prevCategories = [...prev];
            const removed = _.remove(prevCategories, (c) => {
                return c == cate;
            });
            return prevCategories;
        });
    };

    const handleChangeSearch = (event) => {
    }
    
    const onsubmit = (event) => {
        router.replace(`${address}?search=${searchText}&category=${getSelectedCategories}`)
    }

    return (
        <div className="w-100 text-center my-5">
            <form className='w-50 d-inline-block' onSubmit={(e) => {
                e.preventDefault()
                onsubmit()
            }}>
            <input debounceTimeout={1000} type="text" placeholder="دنبال چی میگردی ..." onChange={(e) => {setSearchText(e.target.value)}}   className="form-control d-inline-block  w-50" style={{
                border: `1px solid ${Secondary}`
            }} />
            <select
                className={`form-control ${styles.input} mb-2 w-25 d-inline-block`}
                onChange={(event) => {
                    addCategory(event);
                }}
            >
                <option>دسته ایی را انتخاب کنید</option>
                {categories
                    ? categories.map((cate, index) => (
                        <option key={index} >{cate.title}</option>
                    ))
                    : null}
            </select>
            <br />
            {getSelectedCategories.map((cate, index) => (
                <div
                    key={index}
                    className={styles.selectedCategories + " d-inline-block"}
                    onClick={() => {
                        removeCategory(cate);
                    }}
                >
                    <FiX/>
                    <div className="d-inline-block">
                        <span className="mx-2">{cate} </span>
                    </div>
                </div>
            ))}
            <br/>
            <Button theme="light" type="submit" className={'mt-3'}>جستجو</Button>
            </form>
        </div>)
}

export default SimpleSearch
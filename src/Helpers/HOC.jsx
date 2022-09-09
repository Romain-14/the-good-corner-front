import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../services/API";
import Error from "../Components/Error";
import { loadProducts } from "../store/slices/product.slice";

function HOC({ child }) {
    const [fetchError, setFetchError] = useState(false);

    const dispatch = useDispatch();
    const { list } = useSelector((state) => ({ ...state.products }));

    useEffect(() => {
        if (!list.length) {
            async function fetchData() {
                const res = await getProducts();
                if (res.code) {
                    setFetchError(true);
                    return;
                }
                dispatch(loadProducts(res.data.result));
            }
            fetchData();
        } 
    }, []);

    

    const Child = child;

    if (fetchError) {
        return <Error />;
    }

    return (
        <>
            {!list.length ? (
                <p>loading ...</p>
            ) : (
                    <Child products={list} />
            )}
        </>
    );
}

export default HOC;

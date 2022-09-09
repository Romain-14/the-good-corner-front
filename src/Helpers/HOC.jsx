import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../services/API/product";
import Error from "../Components/Error";
import { loadProducts } from "../store/slices/product.slice";
import { checkToken } from "../services/API/user";
import {signin, signout} from '../store/slices/user.slice';

function HOC({ child, isAuthRequired }) {
    const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(false);
    
    const dispatch = useDispatch();
    const { list, userInfos, isLogged } = useSelector((state) => ({ ...state.products,...state.user}));

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

    useEffect(()=>{
        async function checkAuth(){
            // on récupère le token du LS placé à la connexion de l'user (voir composant signin)
            const TOKEN = localStorage.getItem("u_a_u_t_h");

            // si la route nécessite une authentification et que le TOKEN n'est pas présent dans le local storage on effectue une déconnexion de l'user dans le store puis on redirige sur le home
            if(isAuthRequired && !TOKEN){
                dispatch(signout());
                navigate("/");
            }

            
            // si l'user n'est pas connecté (state globale dans notre store pas à jour)
            if(!isLogged) {
                // et qu'une authentification est requise on le redirige vers le home
                if(isAuthRequired) navigate("/");
                // ou si le localstorage contient un token
                if(TOKEN !== null){
                    // on effectue une requête pour vérifier l'exactitude du token et récupérer les infos de l'user
                    const res = await checkToken(TOKEN);
                    console.log(res)
                    if(res.status === 200){
                        // si c'est ok, on mets à jour les states du slice user 
                        dispatch(signin(res.data.result));
                    }
                }
            }
        }
        checkAuth();
    },[])


    const Child = child;

    if (fetchError) {
        return <Error />;
    }

    return (
        <>
            {!list.length ? (
                <p>loading ...</p>
            ) : (
                    <Child products={list} userInfos={userInfos} />
            )}
        </>
    );
}

export default HOC;

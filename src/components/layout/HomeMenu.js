'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import axios from 'axios';
import {useEffect, useState} from "react";
import config from "@/conf";
import {toast} from "react-toastify";
import {useAuth} from "@/AuthContext";
import {useRouter} from "next/navigation";



export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const { isAuthenticated, updateCartCount } = useAuth();

    let toastMessage = 'Error fetching data'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.URLApi}/product`);
                setBestSellers(response.data.slice(-3));
            } catch (error) {
                toast.error(toastMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [toastMessage]);

    function onClickCart(key) {
        if (isAuthenticated) {
            let keysString = localStorage.getItem("Cart") || '';

            let keys = keysString ? keysString.split(',') : [];

            keys.push(key);

            let updatedKeysString = keys.join(',');

            localStorage.setItem("Cart", updatedKeysString);
            updateCartCount(localStorage.getItem('Cart'));
        }
        else if (!isAuthenticated) {
            router.push('/login');
        }
    }




    return (
        <section className="">
            <div className="absolute left-0 right-0 w-full justify-start"></div>
            <div className="text-center mb-4">
                <SectionHeaders
                    subHeader={'Voici nos'}
                    mainHeader={'Favoris'}/>
            </div>
            {isLoading ? (
                <div className="grid sm:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-700 p-4 rounded-lg text-center">
                            <p className="text-4xl font-black text-white">€</p>
                            <Image src="/sushi.png" alt="sushi" width={300} height={200} className="mx-auto" />
                            <div className="text-white text-2xl font-bold text-center mb-2">null</div>
                            <div className="text-gray-400 py-3">...</div>
                            <button className="bg-primary rounded-lg p-2 text-white px-5">ajouter au panier</button>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {bestSellers?.length > 0 && (
                        <div className="grid sm:grid-cols-3 gap-4">
                            {bestSellers.map((item) => (
                                <div key={item.id_product} className="bg-gray-700 p-4 rounded-lg text-center">
                                    <p className="text-4xl font-black text-white">{item.price}€</p>
                                    <Image src={config.URLAssets + "/images/product/" + item.id_product + "/image/image.png"} alt="sushi" width={300} height={200} className="mx-auto"/>
                                    <div
                                        className="text-white text-2xl font-bold text-center mb-2">{item.product_name}</div>
                                    <div className="text-gray-400 py-3">{item.description}</div>
                                    <button className="bg-primary rounded-lg p-2 text-white px-5" onClick={() => onClickCart(item.id_product)}>ajouter au panier
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
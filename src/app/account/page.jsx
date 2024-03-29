"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "@/conf";
import RecordOrderTable from "@/components/layout/RecordOrderTable";

export default function AccountPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        let errorMessage = 'Merci de mettre une image en PNG uniquement 😀';

        if (file.type !== "image/png") {
            toast.error(errorMessage, {
                theme: "dark"
            });
            event.target.value = "";
        } else {
            setSelectedFile(file);

            setPreviewImage(file ? URL.createObjectURL(file) : null);
        }
    };

    const handleFileUpload = () => {

        const token = localStorage.getItem("authToken");

        if (selectedFile) {
            const formData = new FormData();
            formData.append('avatar', selectedFile);

            axios.post(`${config.URLApi}/user/upload/avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    toast.success(response.data.message, {
                        theme: "dark"
                    });

                    // Wait for 2 seconds (2000 milliseconds) before reloading the page
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                })
                .catch((error) => {
                    toast.error(error.response.data.message, {
                        theme: "dark"
                    });
                });
        } else {
            console.warn('No file selected');
        }
    };

    return (
        <div>
            <ToastContainer />
            <section className={"md:flex"}>
            <div className={"bg-gray-600 rounded-md p-5 items-center w-full max-w-64 mb-5 h-[400px]"}>
                <div className={"w-full max-w-52 pb-5"}>
                    <h1 className={"text-sm md:text-lg font-bold text-white text-center"}>Changer votre avatar</h1>
                    <h1 className={"text-xs md:text-sm text-primary italic text-center pt-3"}>uniquement format .png</h1>
                </div>
                <div className={"w-full max-w-36 mx-auto pb-5"}>
                    <label htmlFor="avatar-input" style={{cursor: 'pointer'}}>
                    <input type="file" id="avatar-input" name="avatar" onChange={handleFileChange}
                           className={"hidden"}/>
                    {previewImage && (
                        <Avatar className="size-36">
                            <AvatarImage src={previewImage}/>
                            <AvatarFallback>avatar</AvatarFallback>
                        </Avatar>
                    )}
                    {!previewImage && (
                        <Avatar className="size-36">
                            <AvatarImage src=""/>
                            <AvatarFallback className={"text-center bg-gray-300 hover:bg-gray-200"}>Cliquez ici</AvatarFallback>
                        </Avatar>
                    )}
                    </label>
                </div>
                <div className={"w-full max-w-36 mx-auto"}>
                    <button onClick={handleFileUpload}
                        className={"bg-primary p-2 px-6 rounded-md text-white w-full"}>Confirmer
                    </button>
                </div>
            </div>
            <RecordOrderTable />
            </section>
        </div>
    );
}

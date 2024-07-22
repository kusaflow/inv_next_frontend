import Login_page from "@components/logging/Login_page";
import Image from 'next/image';

const LoginPage = () => {
    return (
        
        <div
            className="top-0 left-0 min-h-screen flex justify-self-auto">
            {/* Background Image */}
            <Image
                src={"/assets/images/login.jpg"}
                fill={true}
                objectFit="cover"
                quality={100}
                alt="Background"
                className="z-0"
            />

            
            <div className="flex items-center justify-center w-full mt-10 sm:ml-5 z-10">
                <div>
                    <Login_page/>
                </div>
            </div>
        </div>
        
        
        
    );
}

export default LoginPage

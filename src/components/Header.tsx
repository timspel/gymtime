import Logo from "../assets/GymLogo.png";

function Header() {
    return (
        <div className="flex items-center w-full py-4 bg-gradient-to-r from-violet-500 to-blue-500">
            <div className="flex flex-row items-center mx-10  gap-6">
                <img
                    src={Logo}
                    alt="A logotype for the website"
                    className="h-20 rounded-full"
                />
                <h1 className="text-center text-3xl tracking-wider font-bold text-white">
                    Gymtime
                </h1>
            </div>
        </div>
    );
}

export default Header;
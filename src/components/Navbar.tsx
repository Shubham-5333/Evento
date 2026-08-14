
export const Navbar = () => {
    return (
        <div>
            <div style={{"backgroundColor":"#001F24"}} className="w-auto font-sans h-10 flex border-b border-gray-600 justify-between">
                {/* <img src={logo} className="ml"/> */}
                <h1 className="ml-5 p-1 text-2xl font-bold text-white font-sans">Evento.io</h1>
                <button className="mt-2 mr-2  rounded-[10px] bg-gray-900 text-amber-50 text-base font-bold font-sans w-19 h-fit">SIGNIN</button>
            </div>
        </div>
    )
}


import Link from "next/link";

const userHeader = () => {
    return (
        <header className = "bg-gray-900 text-white py-4">
            {/* Include user icon or profile picture */}
            <div className = "flex items-center justify-end space-x-4 px-4">
                {/* User icon or profile picture */}
                <div className = "rounded-full bg-gray-700 w-10 h-10"></div>
                {/* User's name */}
                <div>Username</div>
                {/* Sign-out button */}
                <button className="text-gray-300 hover:text-gray-100">Sign Out</button>
            </div>
        </header>
    )
}

export default userHeader;
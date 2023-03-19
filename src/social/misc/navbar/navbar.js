import URL from "../../../constants/websiteURL"
export default function Navbar() {
    return (
        <div className="navOptions">
            <a className="navOption topOption" href={URL}>Home</a>
            <a className="navOption" href={URL + "app/explorer"}>Explore</a>
            <a className="navOption" href={URL + "app/new"}>Create</a>
            <a className="navOption" href={URL + "app/lock"}>Lock</a>
            <a className="navOption bottomOption" href={URL + "app/dao"}>Moderate</a>
            <a className="navOption" href="#">Profile (Undeveloped)</a>
            <a className="navOption" href="#">Settings (Undeveloped)</a>
        </div>
    )
}
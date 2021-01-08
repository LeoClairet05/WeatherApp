import './Menu.scss';

export default function MenuContent(){
    return(
        <>
            <h1>Menu</h1>
            <div className="row"><hr/></div>
            <ul>
                <li id="option1"><a href="/">Menu option 1</a></li>
                <li id="option2"><a href="/">Menu option 2</a></li>
                <li id="option3"><a href="/">Menu option 3</a></li>
            </ul>
        </>
        
    )
}
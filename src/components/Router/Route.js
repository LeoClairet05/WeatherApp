export default function Route({path, Component}){

    return window.location.pathname === path ? <Component /> : null

}
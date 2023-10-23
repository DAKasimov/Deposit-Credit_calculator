import classes from './MyInput.module.css'
export const MyInput = (props) =>{
    return (
        <input type="text" {...props} className={classes.myInput}/>
    )
}
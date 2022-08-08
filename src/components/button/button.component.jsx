import './button.styles.scss';

const Button = ({ childeren,buttonType,...otherProps }) => {
    /*
        we know we have three different buttons
        
        default

        inverted

        google sign-in


    */
    const BUTTON_TYPE_CLASSES  = {
        google: 'google-sign-in',
        inverted:'inverted',
    }

    return(
        <button className={`button-container ${ BUTTON_TYPE_CLASSES[buttonType]}`}{...otherProps}></button>
    )

}

export default Button;
function Input(props) {
    return (
        <input
            
            className="border border-slate-300 px-4 py-1 rounded-md outline-slate-400"
            {...props} //jogando placeholder value para props
        />
    );
}

export default Input;

const Input = ({ name, value, handler, type, required }) =>
    <div>
        {name}:
        <input
            type={type}
            name={name}
            value={value}
            onChange={handler}
            {...(required ? { required: true } : {})}
        />
    </div>

export default Input
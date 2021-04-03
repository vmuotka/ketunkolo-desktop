const Input = ({ type, value, name, placeholder, onChange, onBlur, label, id, disabled }) => {
  if (!id)
    id = Math.floor(Math.random() * 999999)

  return (
    <div className='inline-flex flex-col'>
      {label && <label className='text-sm opacity-95 focus:text-blue-600' htmlFor={id}>{label}</label>}
      <input className='transition duration-500 mx-2 py-1 px-1 w-min border-b border-secondary-400 focus:border-secondary-600 focus:bg-secondary-400 focus:outline-none disabled:opacity-80'
        id={id}
        style={{ backgroundColor: 'inherit' }}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
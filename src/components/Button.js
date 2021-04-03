const Button = ({ onClick, value }) => {
  return (
    <button onClick={onClick} className='px-2 py-1 focus:outline-none bg-secondary-400 hover:bg-secondary-500 rounded'>
      {value}
    </button>
  )
}

export default Button
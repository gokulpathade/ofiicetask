const Input = (props) => {
  const { title, type, onChange } = props
  return (
    <div className='mb-3'>
      <label>{title}</label>
      <input name='component_text'
        onChange={onChange}
        type={type ? type : 'text'}
        className='form-control'></input>
    </div>
  )
}

export default Input

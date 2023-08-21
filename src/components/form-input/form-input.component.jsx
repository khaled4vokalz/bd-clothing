import './form-input.styles.scss';

export default function FormInput({ label, ...otherProps }) {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {
        label && <label className={`${otherProps.value && otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
      }
    </div>
  )
}

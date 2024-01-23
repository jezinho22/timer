
export default function TimeForm({handleSubmit, handleChange}) {

  return (
    <form id="time-input" onSubmit={handleSubmit}>
      <input type="text" id="mins" name="mins" placeholder="How many minutes?" onChange={handleChange}/>
      <input type="submit" />
    </form>
  )
}

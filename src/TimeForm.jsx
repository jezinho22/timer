
export default function TimeForm({handleSubmit, handleChange}) {

  return (
    <form id="time-input" onSubmit={handleSubmit}>
      <div>
        <input type="text" id="mins" name="mins" placeholder="How many minutes?" onChange={handleChange}/>
        <input type="submit" />   
      </div>
      <div>
      <label htmlFor="bground">Change background</label>   
      <select name="bground" id="bground" defaultValue={"coffee1.jpg"}>
        <option value="coffee1.jpg">Coffee 1</option>
        <option value="coffee2.jpg">Coffee 2</option>
        <option value="tea1.jpg">Tea 1</option>
        <option value="tea2.jpg">Tea 2</option>
      </select>
      </div>
    </form>
  )
}

import { EventAttributes } from "ics";
import { handleDownload } from "../../assets/scripts/calendar";
import { SyntheticEvent } from "react";

const App = () => {
  const date = new Date();
  const minDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}` // YYYY-M-D-H-m

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const data = getEventData();

    if(!data) {
      console.log('missing data');
      return;
    }

    console.log(data);

    const form = document.querySelector('form');

    if(!form) {
      console.log('missing form');
      return;
    }

    if(form.classList.contains('pending')) {
      alert('Processing. Please wait!');
      return;
    }

    form.classList.add('pending');

    handleDownload(data).then(() => {
      console.log('create calendar reminder successful.');
    }).catch(console.log).finally(() => {
      form.classList.remove('pending');
    });
  };

  const getEventData = (): EventAttributes => {
    const titleInput = document.querySelector<HTMLInputElement>('input[name="title"]');
    const startTimeInput = document.querySelector<HTMLInputElement>('input[name="start-time"]');
    const endTimeInput = document.querySelector<HTMLInputElement>('input[name="end-time"]');
    const descriptionInput = document.querySelector<HTMLInputElement>('[name="description"]');
    const locationInput = document.querySelector<HTMLInputElement>('input[name="location"]');

    if(!titleInput || !startTimeInput || !endTimeInput || !descriptionInput || !locationInput) {
      return;
    }

    const startTimeDate = new Date(startTimeInput.value);
    const endTimeDate = new Date(endTimeInput.value);

    return {
      start: [startTimeDate.getFullYear(), startTimeDate.getMonth() + 1, startTimeDate.getDate(), startTimeDate.getHours(), startTimeDate.getMinutes()],
      end: [endTimeDate.getFullYear(), endTimeDate.getMonth() + 1, endTimeDate.getDate(), endTimeDate.getHours(), endTimeDate.getMinutes()],
      title: titleInput.value,
      description: descriptionInput.value,
      location: locationInput.value,
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'Hung Le', email: 'hung0895@gmail.com' },
    };
  };

  return (
    <>
      <h1>Create a Calendar Reminder</h1>

      <div className="red">
        <p>Simple validate so please make sure your data input make sense</p>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <table>
          <tr>
            <th>Title</th>
            <td><input type="text" name="title" required /></td>
          </tr>
          <tr>
            <th><label htmlFor="start-time">Start time</label></th>

            <td>
              <input type="datetime-local" min={minDate} name="start-time" id="start-time" required />
            </td>
          </tr>
          <tr>
            <th><label htmlFor="end-time">End time</label></th>

            <td>
              <input type="datetime-local" min={minDate} name="end-time" id="end-time" required />
            </td>
          </tr>
          <tr>
            <th>Description</th>
            <td><textarea name="description" required></textarea></td>
          </tr>
          <tr>
            <th>Location</th>
            <td><input type="text" name="location" required /></td>
          </tr>
        </table>

        <p>
          <input type="submit" name="submit" value={"Create calendar reminder"} />
        </p>
      </form>
    </>
  )
};

export default App;

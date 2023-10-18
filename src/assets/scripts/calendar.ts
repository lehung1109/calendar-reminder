import { EventAttributes, createEvent } from 'ics';

const handleDownload = async (data: EventAttributes) => {
  const filename = 'ExampleEvent.ics';
  const file: File = await new Promise((resolve, reject) => {
    createEvent(data, (error, value) => {
      if (error) {
        reject(error)
      }

      resolve(new File([value], filename, { type: 'text/calendar' }))
    })
  })
  const url = URL.createObjectURL(file);

  // trying to assign the file URL to a window could cause cross-site
  // issues so this is a workaround using HTML5
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  // document.body.appendChild(anchor);
  anchor.click();
  // document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}

export { handleDownload }

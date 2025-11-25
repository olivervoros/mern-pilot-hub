interface LoogbookEntryCardProps {
  _id: string;
  title: string;
  departureIcao: string;
  arrivalIcao: string;
  aircraftType: string;
  departureTime: string;
  arrivalTime: string;
  additionalInfo: string;
  handleDelete: (_id: string) => void;
  handleEdit: (_id: string) => void;
}

export default function LogbookEntryCard({
  _id,
  title,
  departureIcao,
  arrivalIcao,
  aircraftType,
  departureTime,
  arrivalTime,
  additionalInfo,
  handleDelete,
  handleEdit,
}: LoogbookEntryCardProps) {
  return (
    <div className='my-4 flex justify-center'>
      <a
        href='#'
        className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100'
      >
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
          {title}
        </h5>
        <p className='font-normal text-gray-700'>
          Departure Airport: {departureIcao}
        </p>
        <p className='font-normal text-gray-700'>
          Arrival Airport: {arrivalIcao}
        </p>
        <p className='font-normal text-gray-700'>
          Aircraft Type: {aircraftType}
        </p>
        <p className='font-normal text-gray-700'>
          Departure Time: {departureTime}
        </p>
        <p className='font-normal text-gray-700'>
          Departure Time: {arrivalTime}
        </p>
        <p className='font-normal text-gray-700'>
          Additional Info: {additionalInfo}
        </p>
        <div className='flex mt-4 md:mt-6 justify-center'>
          <button
            onClick={() => handleEdit(_id)}
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300'
          >
            Modify Entry
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className='py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-400 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100'
            type='button'
          >
            Delete Entry
          </button>
        </div>
      </a>
    </div>
  );
}

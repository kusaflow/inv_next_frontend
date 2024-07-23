"use client"

import AddProperty from '@components/add_edit_property' 
import { UploadButton } from '@utils/uploadthing'

const AddProperty_page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <AddProperty defValues={{
    name: '',
    description: '',
    price: '',
    size: '',
    location: '',
    tourLink: '',
    amenities: [],
    assignedTo : "",
    images: ["", "", ""]
  }} isupdate={false} propId={""}/>
    </main>
  );
}

//upload file 
/*

<UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
*/

export default AddProperty_page

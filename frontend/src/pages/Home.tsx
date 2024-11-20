import { useEffect, useState } from 'react'

export const Home = () => {

  const [uploadImgData, setUploadedImgData] = useState({});
  const [previewImg, setPreviewImg] = useState("");

//   useEffect(()=> {

//   }, [uploadImgData]);

  const imgHandler = (e: any) => {
    if(e.target.files && e.target.files.length > 0) {
        console.log(`e.target.files[0] = ::: `, e.target.files[0]);
        setUploadedImgData(e.target.files[0]);
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <>
        <div className='client-img-container'>
            
            <div>
                <h2>Input Image to Edit</h2>
                <input  type="file"  accept='image/jpg, image/jpeg, img/png' onChange={imgHandler}/>
            </div>
            <br />

            <div>
                {previewImg && <img src={previewImg} className="uploaded-img"/>}
            </div>
            <br />
            
            <div>
                <h4>Instructions:</h4>
                <ul>
                    <li>You can upload images in either PNG or JPEG format.</li>
                </ul>
            </div>
            <br />

        </div>
    </>
  )
}

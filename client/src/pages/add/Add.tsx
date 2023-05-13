import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useReducer,
  useState,
} from "react";
import "./add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import { ActionType, Action, NewGig } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

type Reducer = (state: NewGig, action: Action) => NewGig;

export default function Add() {
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | []>([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer<Reducer>(gigReducer, INITIAL_STATE);

  const handleChange: ChangeEventHandler = (e) => {
    const input = e.target as HTMLInputElement;
    dispatch({
      type: ActionType.CHANGE_INPUT,
      payload: {
        name: input.name,
        value: input.value,
      },
    });
  };

  const handleFeature: FormEventHandler = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstEl = form.elements[0] as HTMLInputElement;

    dispatch({
      type: ActionType.ADD_FEATURE,
      payload: {
        feature: firstEl.value,
      },
    });
    firstEl.value = "";
  };

  const handleUpload = async () => {
    setUploading(true);

    try {
      let cover;
      if (singleFile) cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({
        type: ActionType.ADD_IMAGES,
        payload: {
          cover,
          images,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig: NewGig) => newRequest.post("/gigs", gig),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myGigs"] }),
  });

  const handleSubmit: MouseEventHandler = (e) => {
    e.preventDefault();

    mutation.mutate(state);
    navigate("/mygigs");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              id="title"
              name="title"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setSingleFile(e.target.files ? e.target.files[0] : null)
                  }
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFiles(e.target.files ? e.target.files : [])
                  }
                  multiple
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading..." : "upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              cols={30}
              rows={16}
              placeholder="Brief description to introduce your service to customers"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              placeholder="e.g. One-page web design"
              name="shortTitle"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDescription"
              id=""
              cols={30}
              rows={10}
              placeholder="Short description of your service"
              onChange={handleChange}
            />
            <label htmlFor="">Delivery Time(e.g. 3 days)</label>
            <input
              type="number"
              min={1}
              name="deliveryTime"
              onChange={handleChange}
            />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              min={1}
              name="revision"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features.map((f, i) => (
                <div className="item" key={i}>
                  <button
                    onClick={() =>
                      dispatch({
                        type: ActionType.REMOVE_FEATURE,
                        payload: { feature: f },
                      })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" min={1} name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

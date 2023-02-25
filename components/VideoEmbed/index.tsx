import { useState } from "react";
import React from "react";
import ButtonContained from "../Button/ButtonContained";
import ButtonOutlined from "../Button/ButtonOutlined";
import { PROVIDERS } from "../Editor";

interface IState {
  provider: PROVIDERS;
  url: string;
}

interface IVideoEmbedProps {
  onSubmit: (values: IState) => void;
  onCancel: VoidFunction;
}

export default function VideoEmbed({ onSubmit, onCancel }: IVideoEmbedProps) {
  const [state, setState] = useState<IState>({
    provider: PROVIDERS.YOUTUBE,
    url: "",
  });

  React.useEffect(() => {}, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (state.url.length === 0) return alert("enter a valid url");
        onSubmit(state);
      }}
    >
      <div className="input_group">
        <label htmlFor="provider">Video Provider</label>
        <select
          name="provider"
          id="provider"
          onChange={(e) =>
            setState({ ...state, provider: e.target.value as PROVIDERS })
          }
        >
          <option value="youtube">Youtube</option>
          <option value="vimeo">Vimeo</option>
        </select>
      </div>
      <div className="input_group">
        <label htmlFor="url">URL</label>
        <span>
          <input
            type="url"
            placeholder="Paste url here"
            name="url"
            id="url"
            onChange={(e) => setState({ ...state, url: e.target.value })}
          />
        </span>
      </div>
      <ButtonContained type="submit">Embed</ButtonContained>
      <ButtonOutlined onClick={onCancel}>Cancel</ButtonOutlined>
    </form>
  );
}

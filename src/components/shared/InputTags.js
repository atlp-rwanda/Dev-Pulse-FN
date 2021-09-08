import React, { useState } from 'react';

const InputTags = (props) => {
  const { tags, setTags } = props;
  const [input, setInput] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (([' ', ',','Enter'].includes(key)) && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags([...tags, trimmedInput]);
      setInput('');
    }

    if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };
  const deleteTag = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };
  const breakDownIntoEmails = (text,separator) =>{
    return text.split(separator).map((tag) => tag.trim());
  }
  const filterExistingEmails = (emails,existingEmails) =>{
    let filtered = [];
    pastedTags.forEach(tag => {
      if(!tagsCopy.includes(tag)) {
        filtered.push(tag);
      }
    });
  }
  const handlePaste =(e) => {
    e.preventDefault();
    const { clipboardData } = e;
    const pastedText = clipboardData.getData('Text');
    const emails = pastedText.split(/[,\s]+/);
    const allEmails = [ ...tags, ...emails];
    const filtered = new Set(allEmails);
    setTags([...filtered]);
    setInput('');
  };
  return (
    <div className="tagContainer">
      {tags.map((tag, index) => (
        <div className="tag" key={`${tag + index}`}>
          {tag}
          <button type="button" onClick={() => deleteTag(index)}>x</button>
        </div>
      ))}
      <input
        value={input}
        placeholder="Add comma separated emails"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onChange={onChange}
        type="email"
        required
        onPaste={handlePaste}
      />
    </div>

  );
};

export default InputTags;

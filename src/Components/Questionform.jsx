// Question.js
import React from "react";

const Question = ({ questionData, index, handleInputChange, questionType, options }) => {
  const isRequired = questionData.isRequired === 'yes';

  return (
    <div className="mb-4">
      <p>
        {questionData.question_id + 3}.
        <span className="fw-bolder fs-4">
          {questionData.question}
          {isRequired && <code>*</code>}
        </span>
      </p>

      {questionType === 'test' && (
        <input
          type="text"
          className="form-control answerText"
          required={isRequired}
          name={`answer_1_${index}[]`}
          onChange={(e) => handleInputChange(e, index, questionType)}
        />
      )}

      {questionType === 'file_upload' && (
        <input
          type="file"
          className="form-control answerText"
          required={isRequired}
          name={`answer_1_${index}[]`}
          onChange={(e) => handleInputChange(e, index, questionType)}
        />
      )}

      {questionType === 'single_choice' && (
        <div className="ms-4">
          <ul className="list">
            <input
              type="hidden"
              name={`questiontype_1_${index}[]`}
              value={questionType}
            />
            {options.map((option, y) => (
              option && (
                <li className="list__item" key={y}>
                  <input
                    type="radio"
                    className="radio-btn"
                    value={option}
                    name={`answer_1_${index}[]`}
                    id={`opt_${y}_${index}`}
                    onChange={(e) => handleInputChange(e, index, questionType)}
                  />
                  <label htmlFor={`opt_${y}_${index}`} className="label">
                    {option}
                  </label>
                </li>
              )
            ))}
          </ul>
        </div>
      )}

      {questionType === 'multiple_choice' && (
        <div className="ms-4">
          <ul>
            <input
              type="hidden"
              name={`questiontype_1_${index}[]`}
              value={questionType}
            />
            {options.map((option, z) => (
              option && (
                <li className="mb-2" key={z}>
                  <input
                    className="inputcheck"
                    id={`checkbox${z}_${index}`}
                    type="checkbox"
                    value={option}
                    style={{ display: 'none' }}
                    name={`answer_1_${index}[]`}
                    onChange={(e) => handleInputChange(e, index, questionType)}
                  />
                  <label className="checkbox" htmlFor={`checkbox${z}_${index}`}>
                    <span>
                      <svg width="12px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                      </svg>
                    </span>
                    <span>{option}</span>
                  </label>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Question;

import styled from "styled-components";

export const Container = styled.li`
  list-style: none;
  padding-left: 0px;
  margin-left: 0px;
  margin-bottom: 8px;
`;

export const RadioOption = styled.div`
  padding-bottom: 10px;
  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  [type="radio"]:checked + label,
  [type="radio"]:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    display: inline-block;
    color: #666;
    padding-bottom: 4px;
  }
  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }
  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
    content: "";
    width: 12px;
    height: 12px;
    background: #f87da9;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    transition: all 0.2s ease;
  }
  [type="radio"]:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }
  [type="radio"]:checked + label:after {
    opacity: 1;
    transform: scale(1);
  }

  [type="radio"]:focus + label {
    outline: auto;
  }
`;

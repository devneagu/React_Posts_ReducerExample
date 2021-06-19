import styled from "styled-components";

export const PaginationContainer: HTMLElement = styled.span`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(0, -50%);
  margin-bottom: 0.5em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  @media (max-width: 450px) {
    position: relative;
    display: block;
    margin-top: 1.25em;
  }
`;

export const PaginationSvg: HTMLElement = styled.svg`
  height: 1em;
  width: 1em;
  vertical-align: bottom;
  fill: #fffff;
  cursor: pointer;
`;
export const PaginationItem: HTMLElement = styled.span`
  margin-right: 0.6em;
  margin-left: 0.6em;
  z-index: -10;
  cursor: pointer;
  padding: 0 0.3em;
  font-size: 0.7em;
  line-height: 1.5em;
  &.active {
    color: white;
    position: relative;
  }
  &.active::after {
    content: "";
    position: absolute;
    background: #4153af;
    border-radius: 1.5em;
    z-index: -10;
    width: 2em;
    height: 2em;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

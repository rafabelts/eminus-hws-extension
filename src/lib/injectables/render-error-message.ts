export const renderErrorMessage = (
  loadingDiv: HTMLDivElement,
  loader: HTMLDivElement
) => {
  const errorMessage = document.createElement("p");
  errorMessage.style.fontSize = "1.2 rem";
  errorMessage.style.color = "red";
  loader.remove();
  loadingDiv.appendChild(errorMessage);
};

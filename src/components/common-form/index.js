import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function CommonForm({
  action,
  formControls,
  buttonText,
  isBtnDisabled,
  btnType,
  formData,
  setFormData,
  handleFileChange,
  isLoading = false, // Added missing prop with default
}) {
  function renderInputByComponentType(getCurrentControl) {
    let content = null;

    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border dark:bg-black bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );
        break;

      case "file":
        content = (
          <Label
            htmlFor={getCurrentControl.name} // Changed 'for' to 'htmlFor'
            className="flex bg-gray-100 dark:bg-black items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getCurrentControl.label}</h2>
            <Input
              onChange={handleFileChange}
              id={getCurrentControl.name}
              type="file"
              className="hidden" // Added to hide default file input
            />
          </Label>
        );
        break;

      default:
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full dark:bg-black rounded-xl h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );
        break;
    }

    return content;
  }

  return (
    <form action={action}>
      {formControls.map((control) => (
        <div key={control.name}>{renderInputByComponentType(control)}</div>
      ))}
      <div className="mt-6 w-full">
        <Button
          type={btnType || "submit"}
          className={`flex h-11 items-center justify-center px-5 ${isLoading || isBtnDisabled ? "opacity-60" : ""}`}
          disabled={isBtnDisabled || isLoading}
        >
          {isLoading ? "Processing..." : buttonText}
        </Button>
      </div>
    </form>
  );
}

export default CommonForm;
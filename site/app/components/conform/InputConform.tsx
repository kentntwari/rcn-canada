import React from "react";

import { FieldMetadata, getInputProps, useField } from "@conform-to/react";
import { Input } from "../radix/Input";

export const InputConform = ({
  meta,
  type,
  ...props
}: {
  meta: FieldMetadata<string | number>;
  type: Parameters<typeof getInputProps>[1]["type"];
} & React.ComponentProps<typeof Input>) => {
  return (
    <Input
      {...getInputProps(meta, { type, ariaAttributes: true })}
      {...props}
    />
  );
};

export const CountryCodeInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithoutRef<typeof InputConform>, "type">
>((props, ref) => {
  const [meta] = useField(props.name!);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, arrows
    if ([8, 46, 9, 27, 13, 37, 39].includes(event.keyCode)) {
      return;
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ([65, 67, 86, 88].includes(event.keyCode) && event.ctrlKey) {
      return;
    }

    const value = event.currentTarget.value;

    // Allow + only at the start and when empty
    if (
      event.key === "+" &&
      (event.currentTarget.selectionStart === 0 || value === "")
    ) {
      return;
    }

    // Block if trying to enter more than 5 characters (+XXXX)
    if (
      value.length >= 5 &&
      event.currentTarget.selectionStart === value.length
    ) {
      event.preventDefault();
      return;
    }

    // Block any non-digit keys except for + at start
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text");
    if (!/^\+?[0-9]*$/.test(pastedText)) {
      event.preventDefault();
      // toast.error("Only digits and + symbol are allowed");
      console.error("Only digits and + symbol are allowed");
    }
  };

  return (
    <InputConform
      {...props}
      ref={ref}
      type="tel"
      placeholder="+1"
      defaultValue={"+1"}
      className="font-mono w-24"
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      inputMode="numeric"
    />
  );
});

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithoutRef<typeof InputConform>, "type">
>((props, ref) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, arrows
    if ([8, 46, 9, 27, 13, 37, 39].includes(event.keyCode)) {
      return;
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ([65, 67, 86, 88].includes(event.keyCode) && event.ctrlKey) {
      return;
    }

    // Block any non-digit keys
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text");
    if (!/^[0-9]*$/.test(pastedText)) {
      event.preventDefault();
      // toast.error("Only digits are allowed");
      console.error("Only digits are allowed");
    }
  };

  return (
    <InputConform
      {...props}
      ref={ref}
      type="tel"
      className="font-mono flex-1"
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      inputMode="numeric"
    />
  );
});

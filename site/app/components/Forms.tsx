import {
  useForm,
  getFormProps,
  getFieldsetProps,
  FormProvider,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { useFetcher, useNavigate } from "@remix-run/react";

import { Input } from "./radix/Input";
import { CountryCodeInput, NumberInput } from "./conform/InputConform";
import { RadioGroupConform } from "./conform/RadioGroup";
import { SelectConform } from "./conform/SelectConform";
import { TextareaConform } from "./conform/TextareaConform";

import { firstTimerSchema, partnershipSchema } from "~/utils/schemas";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

const DPTS = [
  "choir",
  "sound",
  "media",
  "scribes",
  "protocol",
  "sanctuary keeper",
  "children teacher",
];

const FREQUENCIES = ["weekly", "bi-weekly", "monthly", "quarterly", "yearly"];
const CURRENCIES = ["USD", "EUR", "GBP", "CAD"];
const PAYMENT_OPTIONS = ["paypal", "interac"];

export function FirstTimerForm() {
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const [form, fields] = useForm({
    id: "first-timer-form",
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: firstTimerSchema });
    },
  });
  const a = fields.address.getFieldset();
  const t = fields.phoneNumber.getFieldset();
  const d = fields.description.getFieldset();

  return (
    <FormProvider context={form.context}>
      <fetcher.Form
        {...getFormProps(form)}
        method="POST"
        action="/api/forms"
        className="grid grid-cols-2 gap-4 slg:gap-6"
      >
        <input type="hidden" name="intent" value="register-first-timer" />
        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.fullName.id}
            className="block text-sm slg:text-base font-medium"
          >
            Your name
          </label>
          <Input
            name={fields.fullName.name}
            id={fields.fullName.id}
            aria-label="Full name"
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.fullName.errors}
          </small>
        </div>
        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.email.id}
            className="block text-sm slg:text-base font-medium"
          >
            Your Email
          </label>
          <Input
            type="email"
            name={fields.email.name}
            id={fields.email.id}
            aria-label="email address"
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.email.errors}
          </small>
        </div>
        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.phoneNumber.id}
            className="block text-sm slg:text-base font-medium"
          >
            Your phone number
          </label>
          <div className="flex gap-2">
            <CountryCodeInput meta={t.countryCode} aria-label="Country code" />
            <NumberInput meta={t.phone} aria-label="Phone number" />
          </div>
          <small
            className="flex flex-col gap-0.5 text-xs tracking-widest"
            style={{ color: "red" }}
          >
            <span>{t.countryCode.errors}</span>
            <span>{t.phone.errors}</span>
          </small>
        </div>
        <fieldset
          {...getFieldsetProps(fields.address)}
          className="col-span-2 space-y-3"
        >
          <span className="block text-sm slg:text-base font-medium">
            Where do you live?
          </span>
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-5">
            <div className="col-span-2 space-y-2">
              <label
                htmlFor={a.street.id}
                className="block text-sm slg:text-base font-medium"
              >
                Street
              </label>
              <Input
                name={a.street.name}
                id={a.street.id}
                aria-label="Street"
              />
              <small
                className="text-xs tracking-widest"
                style={{ color: "red" }}
              >
                {a.street.errors}
              </small>
            </div>
            <div className="col-span-1 space-y-2">
              <label
                htmlFor={a.city.id}
                className="block text-sm slg:text-base font-medium"
              >
                City
              </label>
              <Input name={a.city.name} id={a.city.id} aria-label="City" />
              <small
                className="text-xs tracking-widest"
                style={{ color: "red" }}
              >
                {a.city.errors}
              </small>
            </div>
            <div className="col-start-2 col-span-1 space-y-2">
              <label
                htmlFor={a.state.id}
                className="block text-sm slg:text-base font-medium"
              >
                State/Province
              </label>
              <Input
                name={a.state.name}
                id={a.state.id}
                aria-label="State or Province"
              />
              <small
                className="text-xs tracking-widest"
                style={{ color: "red" }}
              >
                {a.state.errors}
              </small>
            </div>
            <div className="col-span-1 space-y-2">
              <label
                htmlFor={a.postalCode.id}
                className="block text-sm slg:text-base font-medium"
              >
                Zip/Postal code
              </label>
              <Input
                name={a.postalCode.name}
                id={a.postalCode.id}
                aria-label="Zip or Postal code"
              />
              <small
                className="text-xs tracking-widest"
                style={{ color: "red" }}
              >
                {a.postalCode.errors}
              </small>
            </div>
            <div className="col-start-2 col-span-1 space-y-2">
              <label
                htmlFor={a.country.id}
                className="block text-sm slg:text-base font-medium"
              >
                Country
              </label>
              <Input
                name={a.country.name}
                id={a.country.id}
                aria-label="Country"
              />
              <small
                className="text-xs tracking-widest"
                style={{ color: "red" }}
              >
                {a.country.errors}
              </small>
            </div>
          </div>
        </fieldset>
        <div className="col-span-2 md:col-span-1 space-y-2">
          <label
            htmlFor={fields.gender.id}
            className="block text-sm slg:text-base font-medium"
          >
            Gender
          </label>
          <RadioGroupConform
            meta={fields.gender}
            items={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.gender.errors}
          </small>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-2">
          <label
            htmlFor={fields.maritalStatus.id}
            className="block text-sm slg:text-base font-medium"
          >
            Your marital status
          </label>
          <RadioGroupConform
            meta={fields.maritalStatus}
            items={[
              { value: "married", label: "Married" },
              { value: "single", label: "Single" },
              { value: "divorced", label: "Divorced" },
            ]}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.maritalStatus.errors}
          </small>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-2">
          <label
            htmlFor={fields.isBornAgain.id}
            className="block text-sm slg:text-base font-medium"
          >
            Are you born again?
          </label>
          <RadioGroupConform
            meta={fields.isBornAgain}
            items={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.isBornAgain.errors}
          </small>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-2">
          <label
            htmlFor={fields.isBaptized.id}
            className="block text-sm slg:text-base font-medium"
          >
            Are you baptized by immersion?
          </label>
          <RadioGroupConform
            meta={fields.isBaptized}
            items={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.isBaptized.errors}
          </small>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-2">
          <label
            htmlFor={fields.isTongueSpeaker.id}
            className="block text-sm slg:text-base font-medium"
          >
            Do you speak in tongues?
          </label>
          <RadioGroupConform
            meta={fields.isTongueSpeaker}
            items={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.isTongueSpeaker.errors}
          </small>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-2">
          <label
            htmlFor={fields.wantsHolySpirit.id}
            className="block text-sm slg:text-base font-medium"
          >
            Would You Like To Receive The Holy Spirit?
          </label>
          <RadioGroupConform
            meta={fields.wantsHolySpirit}
            items={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.wantsHolySpirit.errors}
          </small>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-2">
          <label
            htmlFor={fields.departmentOfInterest.id}
            className="block text-sm slg:text-base font-medium"
          >
            Want to join our workforce?
          </label>
          <SelectConform
            placeholder="Select department"
            meta={fields.departmentOfInterest}
            items={DPTS.map((dpt) => ({
              value: dpt,
              name: dpt,
            }))}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.departmentOfInterest.errors}
          </small>
        </div>
        <div className="col-span-2 md:col-span-1 space-y-1">
          <label
            htmlFor={fields.willBeMessaged.id}
            className="block text-sm slg:text-base font-medium text-pretty slg:text-balance"
          >
            Can we add you to our mailing list and whatsapp group?{" "}
          </label>
          <RadioGroupConform
            meta={fields.willBeMessaged}
            items={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.willBeMessaged.errors}
          </small>
        </div>
        <div className="col-span-2 space-y-2">
          <label
            htmlFor={d.service.id}
            className="block text-sm slg:text-base font-medium"
          >
            Which session of the service today were you most blessed by?
          </label>
          <TextareaConform meta={d.service} />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {d.service.errors}
          </small>
        </div>
        <div className="col-span-2 space-y-2">
          <label
            htmlFor={d.prayerRequest.id}
            className="block text-sm slg:text-base font-medium"
          >
            Let us know your prayer request
          </label>
          <TextareaConform meta={d.prayerRequest} className="min-h-48" />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {d.prayerRequest.errors}
          </small>
        </div>

        <div className="col-start-2 justify-self-end flex items-center gap-x-2 *:w-24 *:h-8 *:flex *:items-center *:justify-center *:rounded-lg">
          <button type="button" className="mt-2" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="mt-2 bg-text text-site">
            Submit
          </button>
        </div>
      </fetcher.Form>
    </FormProvider>
  );
}

export function PartnershipForm() {
  const navigate = useNavigate();

  const fetcher = useFetcher();

  const [form, fields] = useForm({
    id: "partnership-form",
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: partnershipSchema });
    },
  });
  const t = fields.phoneNumber.getFieldset();

  return (
    <FormProvider context={form.context}>
      <fetcher.Form
        {...getFormProps(form)}
        method="POST"
        action="/api/forms"
        className="grid grid-cols-2 gap-4 slg:gap-6"
      >
        <input type="hidden" name="intent" value="register-partnership" />
        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.fullName.id}
            className="block text-sm slg:text-base font-medium"
          >
            Your name
          </label>
          <Input
            name={fields.fullName.name}
            id={fields.fullName.id}
            aria-label="Full name"
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.fullName.errors}
          </small>
        </div>
        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.email.id}
            className="block text-sm slg:text-base font-medium"
          >
            Your Email
          </label>
          <Input
            type="email"
            name={fields.email.name}
            id={fields.email.id}
            aria-label="email address"
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.email.errors}
          </small>
        </div>
        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.phoneNumber.id}
            className="block text-sm slg:text-base font-medium"
          >
            Your phone number
          </label>
          <div className="flex gap-2">
            <CountryCodeInput meta={t.countryCode} aria-label="Country code" />
            <NumberInput meta={t.phone} aria-label="Phone number" />
          </div>
          <small
            className="flex flex-col gap-0.5 text-xs tracking-widest"
            style={{ color: "red" }}
          >
            <span>{t.countryCode.errors}</span>
            <span>{t.phone.errors}</span>
          </small>
        </div>

        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.amount.id}
            className="block text-sm slg:text-base font-medium"
          >
            Amount
          </label>
          <NumberInput meta={fields.amount} aria-label="Amount" />

          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.amount.errors}
          </small>
        </div>

        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.currency.id}
            className="block text-sm slg:text-base font-medium"
          >
            Currency
          </label>
          <RadioGroupConform
            meta={fields.currency}
            items={CURRENCIES.map((c) => ({
              value: c,
              label: c,
            }))}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.currency.errors}
          </small>
        </div>

        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.frequency.id}
            className="block text-sm slg:text-base font-medium"
          >
            Frequency
          </label>
          <RadioGroupConform
            meta={fields.frequency}
            items={FREQUENCIES.map((c) => ({
              value: c,
              label: c,
            }))}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.frequency.errors}
          </small>
        </div>

        <div className="col-span-2 space-y-2">
          <label
            htmlFor={fields.frequency.id}
            className="block text-sm slg:text-base font-medium"
          >
            Payment options
          </label>
          <RadioGroupConform
            meta={fields.paymentOptions}
            items={PAYMENT_OPTIONS.map((c) => ({
              value: c,
              label: c,
            }))}
          />
          <small className="text-xs tracking-widest" style={{ color: "red" }}>
            {fields.paymentOptions.errors}
          </small>
        </div>

        <div className="col-start-2 justify-self-end flex items-center gap-x-2 *:w-24 *:h-8 *:flex *:items-center *:justify-center *:rounded-lg">
          <button type="button" className="mt-2" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="mt-2 bg-text text-site">
            Submit
          </button>
        </div>
      </fetcher.Form>
    </FormProvider>
  );
}

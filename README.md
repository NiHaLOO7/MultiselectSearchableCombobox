
# Multiselect Searchable Combobox (LWC)

A highly customizable **Multiselect Searchable Combobox** built using the **Lightning Web Component (LWC)** framework for Salesforce. It supports features like dynamic search, keyboard navigation, error handling, custom validation, ARIA compliance, and pill-based selection display.

This component is inspired by the **LWC Base Combobox Implementation** ([Salesforce Base-Combobox Implementation](https://github.com/salesforce/base-components-recipes/tree/master/force-app/main/default/lwc/baseCombobox)).

## Features

- **Native SLDS Support**: Leverages **Salesforce Lightning Design System (SLDS)** for a consistent, standard-compliant UI.
- **Multiselect Support**: Supports **multiple selections** while maintaining a clean and intuitive UI. Selections are displayed as pills below the input field.
- **Search and Filter**: Provides search functionality to filter large sets of options, enabling users to quickly find and select options.
- **Keyboard Navigation**: Supports **keyboard navigation** for better accessibility and efficiency.
- **Custom Validation**: Allows dynamic validation using the `setCustomValidity` method, enabling custom error handling for user inputs.
- **ARIA Compliance**: Ensures accessibility with proper ARIA roles and attributes for users with disabilities.

## Demo

### 1. Single Select without Search
![Single Select without Search Image](/assets/Singleselect_without_Search.gif)

### 2. Multiselect without Search
![Multiselect without Search Image](/assets/Multiselect_without_Search.gif)

### 3. Single Select with Search
![Single Select with Search Image](/assets/Singleselect_with_Search.gif)

### 4. Multiselect with Search
![Multiselect with Search Image](/assets/Multiselect_with_Search.gif)

## Usage

To use the component in your Salesforce LWC project, simply import the necessary files from the `lwc` folder. Below is an example usage of the component:

```html
<c-multiselect-searchable-combobox
    name="techSkills"
    label="Select Your Skills"
    options={skillsList}
    value={defaultSkills}
    onchange={handleSelectionChange}
    required
    pills-icon="utility:check"
    show-values
    field-level-help="Choose all skills you are proficient in."
    pills
    allow-search
    multiselect
></c-multiselect-searchable-combobox>
```

### 2. **Define `options` in JavaScript**

```js
skillsList = [
    { label: 'Apex', value: 'apex' },
    { label: 'LWC', value: 'lwc' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'SOQL', value: 'soql' }
];

defaultSkills = ['lwc', 'javascript'];
```

### Supported Attributes

## ⚙️ Component Attributes


| Attribute Name          | Type    | Description                                                                 | Required | Default           |
|-------------------------|---------|-----------------------------------------------------------------------------|----------|-------------------|
| `name`                  | String  | Name of the input field (used in forms)                                     | No       | -                 |
| `label`                 | String  | Label displayed above the combobox                                          | No      | -                 |
| `options`               | Array   | Array of option objects: `{ label: String, value: String }`                | Yes      | -                 |
| `required`              | Boolean | Whether the field is required                                               | No       | false             |
| `readonly`              | Boolean | Makes the input read-only                                                   | No       | false             |
| `disabled`              | Boolean | Disables the entire combobox                                                | No       | false             |
| `pills-icon`            | String  | Icon shown in each selected pill (e.g. `utility:user`)                      | No       | -                 |
| `show-values`           | Boolean | Shows the `value` under the label inside the dropdown                       | No       | false             |
| `field-level-help`      | String  | Help text shown next to the label                                           | No       | -                 |
| `autocomplete`          | String  | Native input autocomplete behavior (`on` / `off`)                           | No       | off               |
| `dropdown-alignment`    | String  | Defines the alignment of the dropdown (`left` / `right` / `center`)        | No       | left              |
| `pills`                 | Boolean | Whether to display pills below the input for selected options               | No       | false             |
| `value`                 | String(Single Select) Array(Multi Select)  | Default or pre-populated selected value(s)                                  | No       | -                 |
| `allow-search`          | Boolean | Enables or disables the search functionality                                | No       | true              |
| `sort`                  | Boolean | Whether to sort the options in alphabetical order                           | No       | false             |
| `multiselect`           | Boolean | Allows multiple selections if set to true                                   | No       | false             |
| `disabled`              | Boolean | If true, the combobox will be disabled                                      | No       | false             |
| `variant`               | String  | The variant changes the appearance of the combobox (`standard`, `label-hidden`, `label-inline`) | No | standard |
| `dropdown-height`       | String  | Height of the dropdown list (e.g., '200px')                                 | No       | auto              |
| `aria-labelledby`       | String  | ID of the element that labels the combobox, enhancing accessibility for screen readers | No       | -                 |
| `aria-label`       | String  | Defines a string label directly on the combobox for accessibility purposes | No       | -                 |
| `aria-describedby`       | String  | ID of the element that provides descriptive information about the combobox | No       | -                 |

---

### Supported Events

1. **`change` Event**: Fired when the selected options change.
   ```js
   handleSelectChange(event) {
       console.log('Selected values:', event.detail);
   }
   ```

### Supported Methods

1. **`checkValidity`**: Checks the validity of the combobox. Returns `true` if valid, `false` otherwise.
2. **`setCustomValidity`**: Sets custom validation messages for the combobox.
   ```js
   if (selectedValue !== 'us') {
       this.template.querySelector('c-multiselect-searchable-combobox').setCustomValidity('Please select "United States"');
   }
   ```

## 🧪 Testing & Validation

Supports all basic field validation and integrates with form submissions. Follows Lightning design principles and best practices.



### Validation through `setCustomValidity` method:

Use this method to perform dynamic validation from the parent component:

```js
handleSelectedOption(event) {
    console.log('Selected Value:', event.detail.value);
    if (event.detail.value !== 'us') {
        this.template.querySelector('c-multiselect-searchable-combobox').setCustomValidity('You need to select "United States"');
    } else {
        this.template.querySelector('c-multiselect-searchable-combobox').setCustomValidity('');
    }
}
```

## 🛠️ TODO / Enhancements
- Grouping & Sections
- Lazy search & Lazy loading
- Infinite scroll / virtual list

---

## Contributing

If you have suggestions or bug fixes, feel free to fork the repository and submit a pull request. We appreciate your contributions to improve the component!

---

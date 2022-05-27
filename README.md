# Node Translation Scripts

Zero dependency i18n translation cli scripts

## CLI

<strong>--help</strong>

#### Validate

<strong>--validate</strong> - Validates reference language against other translations

<strong>-r</strong> or <strong>--refLanguagePath</strong> - Path to root of directory with reference language

<strong>-t</strong> or <strong>--translationPaths</strong> - Paths to root of directories with translations delimited by comma

#### Export

<strong>--export</strong> - Exports translation data to specified languages

<strong>-r</strong> or <strong>--refLanguagePath</strong> - Path to root of directory with reference language

<strong>-t</strong> or <strong>--translationPaths</strong> - Paths to root of directories with translations delimited by comma

<strong>-k</strong> or <strong>--keepOriginalTranslations</strong> - Determines whether original translations should be preserved or not

<strong>-o</strong> or <strong>--outputPath</strong> - Path to output directory

<strong>-i</strong> or <strong>--includeReferenceLanguage</strong> - Include reference language

#### Import

<strong>--import</strong> - Imports translated data to specified directory

<strong>-i</strong> or <strong>--inputPath</strong> - Path to directory with translated files

<strong>-o</strong> or <strong>--outputPath</strong> - Path to output directory

<strong>-r</strong> or <strong>--referenceLanguage</strong> - Reference language (won't be imported)

<strong>-d</strong> or <strong>--dry</strong> - Dry run

## Example

```
{
  ...
  "scripts": {
    "validate-translations": "node-translation-scripts --validate -r \"./public/locales/en/\" -t \"./public/locales/cs/\"",
    "validate-translations:dry": "node-translation-scripts --validate -r \"./public/locales/en/\" -t \"./public/locales/cs/\" --dry",
    "export-translations": "node-translation-scripts --export -r \"./public/locales/en/\" -t \"./public/locales/cs/\" -o \"./export/translations/\" -k -i",
    "import-translations": "node translation-scripts --import -i \"./export/translations\" -o \"./public/locales/\" -r \"en\""
  }
  ...
}
```
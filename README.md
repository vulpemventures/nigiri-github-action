# Nigiri Bitcoin action

Run Nigiri Bitcoin in your Github Action

## Inputs

## `version`

**Optional** The Nigiri version tag. Default to latest.

## `repository_url`

**Optional** The Github repository URL that contains the binary artifact. Default `"https://github.com/vulpemventures/nigiri"`.

## `use_liquid`

**Optional** Use --liquid flag. Default `true`.

## `use_ln`

**Optional** Use --ln flag. Default `false`.

## Usage

```yml
  name: Run Nigiri
  uses: vulpemventures/nigiri-github-action@v1
```

### start Bitcoin-only services

```yml
  name: Run Nigiri
  uses: vulpemventures/nigiri-github-action@v1
  with:
    use_liquid: false
```


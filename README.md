# vapi-capacitor

Plugin for integrating with Vapi

## Install

```bash
npm install vapi-capacitor
npx cap sync
```

## API

<docgen-index>

* [`start(...)`](#start)
* [`stop()`](#stop)
* [`configure(...)`](#configure)
* [`setMuted(...)`](#setmuted)
* [`send(...)`](#send)
* [`addListener(VapiEventNames, ...)`](#addlistenervapieventnames-)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### start(...)

```typescript
start(options: { assistantId: string; }) => Promise<void>
```

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ assistantId: string; }</code> |

--------------------


### stop()

```typescript
stop() => Promise<void>
```

--------------------


### configure(...)

```typescript
configure(options: { publicKey: string; }) => Promise<void>
```

| Param         | Type                                |
| ------------- | ----------------------------------- |
| **`options`** | <code>{ publicKey: string; }</code> |

--------------------


### setMuted(...)

```typescript
setMuted(options: { muted: boolean; }) => Promise<void>
```

| Param         | Type                             |
| ------------- | -------------------------------- |
| **`options`** | <code>{ muted: boolean; }</code> |

--------------------


### send(...)

```typescript
send(options: { type: string; control: string; }) => Promise<void>
```

| Param         | Type                                            |
| ------------- | ----------------------------------------------- |
| **`options`** | <code>{ type: string; control: string; }</code> |

--------------------


### addListener(VapiEventNames, ...)

```typescript
addListener(eventName: VapiEventNames, listenerFunc: (event: any) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                      |
| ------------------ | --------------------------------------------------------- |
| **`eventName`**    | <code><a href="#vapieventnames">VapiEventNames</a></code> |
| **`listenerFunc`** | <code>(event: any) =&gt; void</code>                      |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### VapiEventNames

<code>'call-end' | 'call-start' | 'volume-level' | 'speech-start' | 'speech-end' | 'message' | 'error'</code>

</docgen-api>

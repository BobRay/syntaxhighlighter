## SyntaxHighlighter Extra for MODX Revolution

**Author:** Alex Gorbatchev

**Author:** Bob Ray [Bob's Guides](https://bobsguides.com)

**Acknowledgements:** Theme property and updates thanks to AlexZem

**[Fully compatible with MODX 3 and PHP 8]**

**Documentation:** [SyntaxHighlighter Docs](https://bobsguides.com/syntaxhighlighter-tutorial.html)

**Bugs and requests:** [SyntaxHighlighter Issues](https://github.com/BobRay/SyntaxHighlighter/issues)

**Questions about using SyntaxHighlighter** [MODX Forums](https://community.modx.com)

SyntaxHighlighter is fairly straight port of Alex Gorbatchev's great JS syntax highlighter, adapted for MODX Revolution. The package includes both a plugin and a snippet version of the highlighter. Most of the code in this component, other than the plugin, snippet, and install script, was written by Alex Gorbatchev.

## Brush coverage (karamble fork)

This fork ships 21 additional brushes on top of the stock SyntaxHighlighter 3.x set, covering modern programming languages, config formats, markup, and API description formats. Pass any of the names below to the snippet's `&brushes` parameter or use the matching `brush: <name>` class on a `<pre>` element.

**Programming languages (stock):** Bash, Python, JScript, Php, Css, Cpp, CSharp, Java, Ruby, Perl, Scala, Groovy, Sql, Vb, Delphi, Erlang, PowerShell, AppleScript, AS3, ColdFusion, JavaFX, Sass, Plain, Xml

**Programming languages (new in this fork):** Go, Rust, TypeScript, Swift, Kotlin, Zig, Julia, R, Lua, Cuda

**Config and infrastructure formats (new):** Yaml, Toml, Json, Json5/Jsonc, Hcl (Terraform), Dockerfile, Nginx, Makefile

**Markup and APIs (new):** Markdown, GraphQL, Protobuf

To enable brushes, pass their names to the snippet:

```
[[SyntaxHighlighter? &brushes=`Bash,Yaml,Dockerfile,Json,Go,Rust` &theme=`Midnight`]]
```

Then in your content, use the matching class:

```
<pre class="brush: yaml">
key: value
list:
  - item
</pre>
```

The class goes on `<pre>` directly. Do **not** wrap the code in a nested `<code>` element. `SyntaxHighlighter.all()` only matches `<pre class="brush: ...">` and silently skips wrapped variants.

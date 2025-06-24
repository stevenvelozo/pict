# Pict Design Philosophy

Pict was born from the desire to not have an opinionated framework manage state.  It was built on top of the fable services toolkit.

## The Intended Pattern is Simple

Most modern frameworks have a tight coupling between complexity, state management and visual layout.  The most common pattern for javascript HTML templating blends the code and templates into a single byte stream (whether we are talking JSX, react, vue or other tools).  This ends up meaning that reusability and longevity of code is often limited to the purpose a developer originally wrote the code.

Pict intentionally separates logic from templating, focusing on overriding of templates without altering programmable behavior.

You should be able to write a behavior once and reuse it across multiple applications (e.g. web, command-line, etc.) with maximum code reuse.  And when the software product needs to change interface shape or paradigm, we shouldn't have to rewrite the whole thing.

# Take 1
```html
<div class="research-path">
	<h3>Production Route</h3>
	<p>biger nujmbger<br>cost: 5</p>
	<button class="btn tabbtn">please</button>
</div><br>
<div class="research-path-lower research-path-lower-left">
	<h3>Content Route</h3>
	<p>next prestige layer<br>cost: ∞</p>
	<button class="btn tabbtn">buy</button>
</div><div class="research-path-lower research-path-lower-right">
	<h3>Automation Route</h3>
	<p>laziness<br>cost: -2</p>
	<button class="btn tabbtn">max all</button>
</div>
```
```css
.research-path, .research-path-lower {
	display: inline-block;
	text-align: center;
	width: 175px;
}

.research-path-lower-left {
	margin-right: 10px
}

.research-path-lower-right {
	margin-left: 10px
}

.research-path-lower h3 {
	width: max-content;
	margin-left: auto;
	margin-right: auto;
}
```
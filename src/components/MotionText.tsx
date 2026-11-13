import {Children, cloneElement, isValidElement, type CSSProperties, type ReactNode, type ReactElement} from 'react';

// Render letters on the server too: hydration never replaces an already painted title.
export function MotionText({children}:{children:ReactNode}){
 let index=0;
 const render=(nodes:ReactNode):ReactNode=>Children.map(nodes,node=>{
  if(typeof node==='string')return node.split(/(\s+)/).map((word,key)=>!word.trim()?word:<span className="motion-word" key={key}>{Array.from(word).map(letter=>{const i=index++;return <span className="scroll-letter" key={i} style={{'--letter-y':`${12+i%3*8}px`,'--letter-rotation':`${i%2?5:-5}deg`,'--letter-delay':`${i*.02}s`} as CSSProperties}>{letter}</span>})}</span>);
  if(isValidElement<{children?:ReactNode}>(node)&&node.props.children)return cloneElement(node as ReactElement<{children?:ReactNode}>,undefined,render(node.props.children));
  return node;
 });
 return <>{render(children)}</>;
}

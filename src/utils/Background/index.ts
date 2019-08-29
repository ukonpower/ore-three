import * as ORE from '../../'
import * as THREE from 'three';

import vert from './shaders/background.vs';

export class Background extends THREE.Mesh{
    
    constructor( fragmentShader: string, uniforms: ORE.Uniforms ){

        let geo = new THREE.BufferGeometry();

        let posArray = [];
        let indexArray = [];
        let uvArray = [];

        posArray.push( -1,1,0 );
        posArray.push( 1,1,0 );
        posArray.push( 1,-1,0 );
        posArray.push( -1,-1,0 );

        uvArray.push( 0,1 );
        uvArray.push( 1,1 );
        uvArray.push( 1,0 );
        uvArray.push( 0,0 );

        indexArray.push( 0,2,1,0,3,2 );
        
        let pos = new Float32Array( posArray );
        let indices = new Uint32Array( indexArray );
        let uv = new Float32Array( uvArray );

        geo.addAttribute( 'position', new THREE.BufferAttribute(  pos, 3  )  );
        geo.addAttribute( 'uv', new THREE.BufferAttribute(  uv, 2  )  );
        geo.setIndex( new THREE.BufferAttribute( indices,1 ) )
        
        let mat = new THREE.ShaderMaterial( {
            uniforms: uniforms,
            fragmentShader: fragmentShader,
            vertexShader: vert,
            transparent:true,
            depthFunc: THREE.NeverDepth
        } );

        super( geo, mat )

        this.frustumCulled = false;
    }

}
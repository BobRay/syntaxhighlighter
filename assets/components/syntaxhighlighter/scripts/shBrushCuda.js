/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * CUDA C/C++ brush
 * Custom brush for the karamble/syntaxhighlighter fork.
 * Extends C/C++ with CUDA-specific keywords, qualifiers, types and built-ins.
 *
 * @license LGPL v3 or later
 */
;(function()
{
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        var cppKeywords = 'auto break case catch class const constexpr continue default delete do else enum explicit export extern false for friend goto if inline int long mutable namespace new operator private protected public register return short signed sizeof static struct switch template this throw true try typedef typeid typename union unsigned using virtual void volatile while';
        var cudaQuals   = '__global__ __device__ __host__ __shared__ __constant__ __restrict__ __forceinline__ __noinline__ __launch_bounds__ __managed__';
        var cudaTypes   = 'dim3 char1 char2 char3 char4 uchar1 uchar2 uchar3 uchar4 short1 short2 short3 short4 ushort1 ushort2 ushort3 ushort4 int1 int2 int3 int4 uint1 uint2 uint3 uint4 long1 long2 long3 long4 ulong1 ulong2 ulong3 ulong4 float1 float2 float3 float4 double1 double2 cudaError_t cudaStream_t cudaEvent_t';
        var cudaBuiltin = 'threadIdx blockIdx blockDim gridDim warpSize __syncthreads __syncwarp atomicAdd atomicSub atomicExch atomicMin atomicMax atomicCAS __ballot __any __all __shfl __shfl_up __shfl_down __shfl_xor cudaMalloc cudaFree cudaMemcpy cudaMemset cudaDeviceSynchronize cudaGetLastError';

        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments,        css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.multiLineCComments,         css: 'comments' },
            { regex: SyntaxHighlighter.regexLib.doubleQuotedString,         css: 'string'   },
            { regex: SyntaxHighlighter.regexLib.singleQuotedString,         css: 'string'   },
            { regex: /^\s*#\s*[a-zA-Z]+/gm,                                 css: 'preprocessor bold' },
            { regex: /<<<[^>]*>>>/g,                                        css: 'preprocessor bold' },
            { regex: /-?\b\d+(\.\d+)?[fFlLuU]?\b/g,                         css: 'color2 bold' },
            { regex: new RegExp(this.getKeywords(cudaQuals),  'gm'),        css: 'preprocessor bold' },
            { regex: new RegExp(this.getKeywords(cudaTypes),  'gm'),        css: 'color1 bold' },
            { regex: new RegExp(this.getKeywords(cudaBuiltin),'gm'),        css: 'functions bold' },
            { regex: new RegExp(this.getKeywords(cppKeywords),'gm'),        css: 'keyword bold' }
        ];
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['cuda', 'cu'];

    SyntaxHighlighter.brushes.Cuda = Brush;

    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

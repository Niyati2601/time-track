import React from 'react'

const FeedBack = () => {
  return (
    <div>
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
    <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
            <a href="#"
                class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ">
                Send Feedback
            </a>
        </li>
        <li class="mr-2">
            <a href="#" class="inline-block p-4 text-purple-600 border-b-2 border-purple-600 rounded-t-lg active "
                aria-current="page">
                Given Feedback [0]
            </a>
        </li>
        <li class="mr-2">
            <a href="#"
                class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ">
                Received Feedback [0]
            </a>
        </li>
       
    </ul>
</div>
    </div>
  )
}

export default FeedBack
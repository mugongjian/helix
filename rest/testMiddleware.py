class testMiddleware1(object):
    def process_request(self,request):
        print( 'test mw 1 . request')
        return None
    def process_view(self, request, view_func, view_args, view_kwargs):
        print( 'test mw 1 . view')
        return None
    def process_template_response(self, request, response):
        print( 'test mw 1  . template response')
        
    def process_response(self, request, response):
        print( 'test mw 1  . response')
        return response
        

class testMiddleware2(object):
    def process_request(self,request):
        print( 'test mw 2 . request')
        return None
    def process_view(self, request, view_func, view_args, view_kwargs):
        print( 'test mw2 . view')
        return None

    def process_template_response(self, request, response):
        print( 'test mw2 . template response')
        
    def process_response(self, request, response):
        print( 'test mw2 . response')
        return response

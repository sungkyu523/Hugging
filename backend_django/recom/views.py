from django_pandas.io import read_frame

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .models import Counselor, CounselorReview
from .serializers import CounselorSerializer

from .cf_counselor import cf_item_based_counselor as cf

# Create your views here.
class CounselorRecomAPI(APIView):

    # DB에 2번 접근하는중
    # 리팩토링 예정
    @api_view(['GET',])
    def get(self, member_id):
        # 상담사 데이터는 변하지 않을것이므로 CSV 등으로 가지고 있는것이 좋아보임 수정 예정
        queryset = Counselor.objects.all()
        print(list(queryset))
        counselorDf = read_frame(queryset)
        reviewDf = read_frame(CounselorReview.objects.all())
        cf_list = cf(member_id, 1, counselorDf, reviewDf).tolist()
        cf_list = list(map(int, cf_list))
        print(type(cf_list[0]))


        serializer = CounselorSerializer(queryset, many=True)
        return Response(serializer.data)